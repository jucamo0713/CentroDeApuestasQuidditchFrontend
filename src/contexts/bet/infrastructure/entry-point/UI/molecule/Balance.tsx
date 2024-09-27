import React from 'react';

interface BalanceProps {
    galleons: number;
    knuts: number;
    sickles: number;
}

const Balance: React.FC<BalanceProps> = ({ galleons, knuts, sickles }) => {
    return (
        <div>
            {galleons} Galleons | {sickles} Sickles | {knuts} Knuts
        </div>
    );
};

export default Balance;
