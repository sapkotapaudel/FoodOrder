import {Fragment} from 'react';
import classes from './Modal.module.css';
import ReactDom from 'react-dom'

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClick}/>
}

const ModalOverlay = (props)=> {
    return (<div className={classes.modal}>
        <div className={classes.content}>
            {props.children}
        </div>
    </div>)
}

const portalId = document.getElementById('overlays')

const Modal = (props)=> {

    return <Fragment>
        {ReactDom.createPortal(<Backdrop onClick={props.onClick}/>,portalId)}
        {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalId)}
    </Fragment>

}

export default Modal