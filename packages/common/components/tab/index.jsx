import React from 'react';
import { Tabs } from 'antd';
import styles from './tab.module.scss';

function Tab({ items, onChange }) {
    return (
        <div className={styles['custom-tabs']}>
            <Tabs items={items} onChange={onChange} />
        </div>
    );
}

export default Tab;
