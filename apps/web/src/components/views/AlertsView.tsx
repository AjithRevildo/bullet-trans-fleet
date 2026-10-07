import { Badge, Card, Table, TableCell, TableRow } from '../ui';

interface DriversViewProps {
  drivers: Array<{ id: string; name: string; phone: string; vehicle: string; status: string; shift: string; branch: string }>;
}

export function DriversView({ drivers }: DriversViewProps) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Driver roster</h2>
        <span className="text-sm text-slate-400">{drivers.length} drivers</span>
      </div>

      <Table columns={['Driver', 'Assigned Vehicle', 'Status', 'Shift', 'Branch']}>
        {drivers.map((driver) => (
          <TableRow key={driver.id}>
            <TableCell>
              <div className="font-medium text-white">{driver.name}</div>
              <div className="text-xs text-slate-400">{driver.phone}</div>
            </TableCell>
            <TableCell>{driver.vehicle}</TableCell>
            <TableCell>
              <Badge status={driver.status}>{driver.status}</Badge>
            </TableCell>
            <TableCell>{driver.shift}</TableCell>
            <TableCell>{driver.branch}</TableCell>
          </TableRow>
        ))}
      </Table>
    </Card>
  );
}
