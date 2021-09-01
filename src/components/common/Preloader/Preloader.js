import React from 'react';
import styles from "../../Users/users.module.css";

const Preloader = () => {
    return (
        <div>
            <div className={styles.preloader}>
                <div className={styles.spinner}/>
            </div>
        </div>
    );
};

export default Preloader;