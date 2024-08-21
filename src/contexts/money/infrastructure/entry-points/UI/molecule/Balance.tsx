import React from 'react';
import './Balance.css';
import { MoneyData } from '../../../../../money/domain/model/MoneyData';
import { GalleonIcon } from '../../../../../shared/infrastructure/entry-points/UI/atoms/coins/galleons/GalleonIcon';
import { KnutIcon } from '../../../../../shared/infrastructure/entry-points/UI/atoms/coins/knuts/KnutIcon';
import { SicklesIcon } from '../../../../../shared/infrastructure/entry-points/UI/atoms/coins/sickles/SicklesIcon';

export default function Balance(params: MoneyData) {
    return (
        <div className="balance-container">
            <GalleonIcon />
            {params?.galleons ?? 0} |&nbsp;
            <SicklesIcon />
            {params?.sickles ?? 0} |&nbsp;
            <KnutIcon />
            {params?.knuts ?? 0}
        </div>
    );
}
