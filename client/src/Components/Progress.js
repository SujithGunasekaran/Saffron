import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from '@material-ui/core/LinearProgress';
import useFirestore from '../Hooks/useFirestore';
import { connect } from 'react-redux';


function Progress(props) {

    const { file, setFileName } = props;
    const { username } = props.AuthenticateReducer;

    const StyledLinearProgress = withStyles({
        colorPrimary: {
            backgroundColor: "#F3E3E3"
        },
        barColorPrimary: {
            backgroundColor: "rgb(241, 153, 169)"
        }
    })(LinearProgress);
    const { progress, imageUploadeError, URL } = useFirestore(file, username)
    if (URL) {
        setFileName('')
    }
    return (
        <div style={styles.progress_main}>
            {
                progress !== 100 ? <StyledLinearProgress style={{ height: '3px' }} /> : null
            }
        </div>
    );
}

const styles = {
    progress_main: {
        marginTop: '20px',
    }
}

const mapStateToProps = (state) => ({
    AuthenticateReducer: state.AuthenticateReducer
})

export default connect(mapStateToProps)(Progress)
