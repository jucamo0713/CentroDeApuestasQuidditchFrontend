import React from 'react';
import { Box } from '@mui/material';
import { GalleonIcon } from '../../../../../shared/infrastructure/entry-points/UI/atoms/coins/galleons/GalleonIcon';
import { KnutIcon } from '../../../../../shared/infrastructure/entry-points/UI/atoms/coins/knuts/KnutIcon';
import { SicklesIcon } from '../../../../../shared/infrastructure/entry-points/UI/atoms/coins/sickles/SicklesIcon';

export const RechargeIcons = () => (
    <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
        <GalleonIcon />
        <SicklesIcon />
        <KnutIcon />
    </Box>
);
