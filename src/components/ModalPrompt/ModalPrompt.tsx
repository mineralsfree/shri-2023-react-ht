import ReactDOM from "react-dom";
import React, {useState} from "react";
import styles from './ModalPrompt.module.scss'
import {DeleteButton} from "@/components/Buttons/DeleteButton/DeleteButton";
import classNames from "classnames";

interface ModalPromptProps {
    text: string;
    closeHandler: () => void;
    confirmHandler: () => void;
}

export const ModalPrompt = ({text, closeHandler, confirmHandler}: ModalPromptProps) => {
    return (
        <>
            {ReactDOM.createPortal(
                <div onClick={closeHandler} className={styles.background}>
                    <div className={styles.modalContainer}>
                        <div className={styles.headerContainer}>
                            <p className={styles.header}>Удаление билета</p>
                            <DeleteButton onClick={closeHandler}></DeleteButton>
                        </div>
                        <p className={styles.text}>{text}</p>
                        <div className={styles.buttonContainer}>
                            <button onClick={confirmHandler} className={classNames(styles.button, styles.buttonConfirm)}>Да</button>
                            <button onClick={closeHandler} className={classNames(styles.button, styles.buttonClose)}>Нет</button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}