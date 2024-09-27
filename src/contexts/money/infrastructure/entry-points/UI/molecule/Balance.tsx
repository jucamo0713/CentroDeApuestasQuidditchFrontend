import React from 'react';
import { MoneyData } from '../../../../../money/domain/model/MoneyData';
import { GalleonIconTable } from '../../../../../shared/infrastructure/entry-points/UI/atoms/coins/galleons/GalleonIconTable';
import { KnutIconTable } from '../../../../../shared/infrastructure/entry-points/UI/atoms/coins/knuts/KnutIconTable';
import { SicklesIconTable } from '../../../../../shared/infrastructure/entry-points/UI/atoms/coins/sickles/SicklesIconTable';

export default function Balance(params: MoneyData) {
    return (
        <div className="balance-container">
            <GalleonIconTable />
            {params?.galleons ?? 0} |&nbsp;
            <SicklesIconTable />
            {params?.sickles ?? 0} |&nbsp;
            <KnutIconTable />
            {params?.knuts ?? 0}
        </div>
    );
}
