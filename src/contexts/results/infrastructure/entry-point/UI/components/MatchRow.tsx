import { Link } from 'react-router-dom';
import { Button, TableCell, TableRow } from '@mui/material';
import { AppRoutesConstants } from '../../../../../shared/domain/model/constants/AppRoutes.Constants';
import { MatchData } from '../../../../domain/model/matchData';
import './Results.css';

// Componente para la fila de la tabla
export const MatchRow = ({ match }: { match: MatchData }) => (
    <TableRow>
        <TableCell sx={{ color: '#fff' }}>{match.teamA}</TableCell>
        <TableCell sx={{ color: '#fff' }}>{match.teamB}</TableCell>
        <TableCell sx={{ color: '#fff' }}>{match.teamWinning}</TableCell>
        <TableCell sx={{ color: '#fff' }}>{match.result}</TableCell>
        <TableCell>
            <Button variant="contained" color="info" component={Link} to={AppRoutesConstants.MATCH_DETAIL}>
                Detalle
            </Button>
        </TableCell>
    </TableRow>
);
