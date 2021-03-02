  import React, { useState, useEffect } from 'react';
  import TextField from '@material-ui/core/TextField';
  import Button from '@material-ui/core/Button';
  import Grid from '@material-ui/core/Grid';
  import Typography from '@material-ui/core/Typography';
  import { ipcRenderer, remote } from 'electron';
  import Result from '../results';
  import Loading from '../loading';
  import Cog from './assets/cog.svg';
  import Logo from './assets/logo.svg';
  import { Container, Image } from './styles';

  const YouTubeRegex = /(.*?)(^|\/|v=)([a-z0-9_-]{11})(.*)?/gim;
  const VideoIdRegex = /([a-z0-9_-]{11})/gim;


  const MainView: React.FC = () => {
    const [link, setLink] = useState('');
    const [status, setStatus] = useState('wait');
    const [bpm, setBpm] = useState(0);
    const [loading, setLoading] = useState(0);
    const [error, _setError] = useState({
      link: false,
      server: false
    });

    const setError = (newError: object) => _setError(currentValue => ({ ...currentValue, ...newError }));

    useEffect(() => {
      ipcRenderer.on('percentage', (event, percentage) => setLoading(percentage));

      ipcRenderer.on('error', (event, serverError) => {
        setLoading(0)
        setStatus('wait');
        setError({ server: serverError})
      });

      ipcRenderer.on('result', (event, bpm) => {
        setStatus('success');
        setBpm(bpm);
      });
    },[])

    const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!link) return setError({ link: 'Link can\'t be blank' });

      const matches = link.match(VideoIdRegex);
      if (!matches) return setError({ link: 'Invalid VideoID' });
      if (!link.match(YouTubeRegex)) return setError({ link: 'Not a valid Link' });
      if (error.link) setError({ link: false });

      ipcRenderer.send('upload', { videoId: matches[0] });
      setStatus('loading');
    };

    const handlePortfolioLink = () => remote.shell.openExternal('https://www.husek.me/');
    const handleLink = ({ target }: React.ChangeEvent<HTMLInputElement>) => setLink(target.value)
    const handleReset = () => {
      setLink('');
      setStatus('wait');
      setBpm(0);
    }

    return (
      <Container>
        {status === 'wait' && (
          <form onSubmit={handleSend} style={{ width: '100%', height: 'auto' }}>
            <Grid container justify="center" alignItems="center">

              <Grid item >
                <Image src={Cog} className="cog" />
                <img src={Logo} className="logo" alt="husek.me" />
              </Grid>


              <Grid item container xs={12}>
                <Grid item xs={12} md={9}>
                  <TextField error={error.link} helperText={error.link} label="YouTube Link or Video ID" color="secondary" fullWidth value={link} onChange={handleLink} />
                </Grid>

                <Grid item xs={12} md={3}>
                  <Button type="submit" variant="contained" color="primary" size="large" fullWidth>Get BPM</Button>
                </Grid>

                {error.server && (
                  <Typography>
                    {error.server}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </form>
        )}

        {status === 'loading' && <Loading percentage={loading} />}

        {status === 'success' && <Result bpm={bpm} onReset={handleReset} />}

        <footer>
          <Button onClick={handlePortfolioLink}>by Husek</Button>
        </footer>

      </Container>
    );
  };

  export default MainView;
