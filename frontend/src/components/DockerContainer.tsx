import { Paper, styled, Typography } from '@material-ui/core';
import React, {  } from "react";
import Icon from '@mui/material/Icon';
import { padding } from '@mui/system';


export interface IContainerProps {
    id: string;
    name: string;
    exposedUrl: string;
    icon: string;
    color: string;
}

export interface IContainerState {
}



const StyledPaper = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    padding: 10
  }));

export default class DockerContainer extends React.Component<IContainerProps, IContainerState> {
    constructor(props: IContainerProps) {
        super(props);

        this.state = {
        }
    }

    public render() {
        return (
            <a href={this.props.exposedUrl}>
                <StyledPaper elevation={6} >
                        <Icon sx={{ fontSize: 90,margin:2, color: "{this.props.color}" }}>{this.props.icon}</Icon>
                        <Typography>
                            <strong>{this.props.name}</strong>
                        </Typography>
                </StyledPaper>
            </a>
        );
    }
}
