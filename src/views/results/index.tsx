import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ButtonWrapper, BPMValue } from './styles';


interface ResultViewProps {
  bpm: number
  onReset(): void
}

const Result = ({ bpm, onReset }: ResultViewProps) => (
  <Grid container justify="center" alignItems="center" direction="column">
    <Grid item>
      <BPMValue variant="h1">{bpm}</BPMValue>
    </Grid>
    <Grid item>
      <Typography variant="h4">BPM</Typography>
    </Grid>

    <ButtonWrapper item>
      <Button variant="contained" size="large" onClick={onReset}>
        Get another song bpm
      </Button>
    </ButtonWrapper>
  </Grid>
);

export default Result;
