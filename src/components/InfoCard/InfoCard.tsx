'use client';
import styles from './InfoCard.module.scss';
import classNames from "classnames";
import {useState} from "react";
import {ExpandButton} from "@/components/Buttons/ExpandButton/ExpandButton";

interface InfoCardProps {
    title: string;
    content?: string[];
    className?: string;
    collapsible?: boolean;
}

export const InfoCard = (props: InfoCardProps) => {
    const {collapsible} = props;
    const [collapsed, setCollapsed] = useState(!!collapsible);
    const {title, content, className} = props;
    return (<div className={classNames(styles.container, className)}>

        <div onClick={() => collapsible && setCollapsed(!collapsed)} className={styles.header}>
            <div className={classNames(styles.title, {[styles.titleClickable]: collapsible})}>{title}</div>
            {collapsible && <ExpandButton size={32} fill='#333333' expanded={collapsed}/>}
        </div>
        {content && content.length > 0 && <div
            className={classNames(styles.content, {[styles.collapsed]: collapsed})}>{content.map((paragraph: string, index) => {
            return (<p className={classNames(styles.paragraph,)} key={index}>{paragraph}</p>);
        })}</div>}
    </div>)
}