import { Badge, Card, Table, TableCell, TableRow } from '../ui';

interface MaintenanceViewProps {
  maintenanceRecords: Array<{ id: string; vehicle: string; service: string; date: string; status: string }>;
}

export function MaintenanceView({ maintenanceRecords }: MaintenanceViewProps) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Maintenance scheduler</h2>
        <span className="text-sm text-slate-400">{maintenanceRecords.length} records</span>
      </div>

      <Table columns={['Vehicle', 'Service', 'Due date', 'Status']}>
        {maintenanceRecords.map((record) => (
          <TableRow key={record.id}>
            <TableCell>{record.vehicle}</TableCell>
            <TableCell>{record.service}</TableCell>
            <TableCell>{record.date}</TableCell>
            <TableCell>
              <Badge status={record.status}>{record.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </Card>
  );
}
