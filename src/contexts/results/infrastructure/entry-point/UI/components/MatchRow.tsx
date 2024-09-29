import { Link } from 'react-router-dom';
import { Button, TableCell, TableRow } from '@mui/material';
import { MatchData } from '../../../../domain/model/matchData';
import './Results.css';

// Componente para la fila de la tabla
export const MatchRow = ({ match }: { match: MatchData }) => (
    <TableRow>
        <TableCell sx={{ color: '#fff' }}>{match.teamA}</TableCell>
        <TableCell sx={{ color: '#fff' }}>{match.scoreA}</TableCell>
        <TableCell sx={{ color: '#fff' }}>{match.teamB}</TableCell>
        <TableCell sx={{ color: '#fff' }}>{match.scoreB}</TableCell>
        <TableCell sx={{ color: '#fff' }}>{match.date.toLocaleString()}</TableCell>
        <TableCell>
            <Button variant="contained" color="info" component={Link} to={`/match-result/${match.matchId}`}>
                Detalle
            </Button>
        </TableCell>
    </TableRow>
);
