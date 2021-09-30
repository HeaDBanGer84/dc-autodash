import React, { useEffect, useState } from 'react';
import DockerContainer from './components/DockerContainer';
import { IContainerProps } from './components/DockerContainer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { IconButton } from '@material-ui/core';
import Dashboard from '@material-ui/icons/Dashboard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  containerGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

function App() {

  const classes = useStyles();
  const [state, setState] = useState([]);

  const getData = async () => {
    const response = await fetch('/api/v1/docker');
    const data = await response.json();
    console.log(data);
    setState(data);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Dashboard />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <main>
      <Container className={classes.containerGrid} maxWidth="md">
          <Grid container spacing={4}>
            {state.map((item: IContainerProps, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>     
              <DockerContainer
                id={item.id}
                name={item.name}
                exposedUrl={item.exposedUrl}
                icon={item.icon}
                color={item.color} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

    </React.Fragment>

  );
}

export default App;
