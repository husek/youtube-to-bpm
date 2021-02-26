import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { LoadingScreenWrapper} from './styles';


interface LoadingViewProps {
  percentage: number
}

const Loading = ({ percentage }: LoadingViewProps) => (
  <LoadingScreenWrapper container justify="center" alignItems="center" spacing={2}>
    <Grid item>
      <Typography variant="h4">
        {percentage <= 80 && 'Downloading file...'}
        {(percentage > 80 && percentage < 100) && 'Calculating BPM...'}
      </Typography>
    </Grid>

    <Grid item xs={12}>
      <LinearProgress variant="determinate" value={percentage} color="secondary" />
    </Grid>

    <Grid item>
      <Typography component="p">
        This might take a few mins depending on your internet connection and CPU.
      </Typography>
    </Grid>
  </LoadingScreenWrapper>
);

export default Loading;
