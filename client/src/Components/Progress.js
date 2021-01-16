import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from '@material-ui/core/LinearProgress';
import useFirestore from '../Hooks/useFirestore';


export default function Progress({ file, setFileName }) {
    const StyledLinearProgress = withStyles({
        colorPrimary: {
            backgroundColor: "#F3E3E3"
        },
        barColorPrimary: {
            backgroundColor: "rgb(241, 153, 169)"
        }
    })(LinearProgress);
    const { progress, imageUploadeError, URL } = useFirestore(file)
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
