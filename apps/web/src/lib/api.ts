import { Badge, Card, Table, TableCell, TableRow } from '../ui';

interface AuditViewProps {
  auditRecords: Array<{ id: string; actor: string; action: string; entity: string; time: string; impact: string }>;
}

export function AuditView({ auditRecords }: AuditViewProps) {
  return (
    <Card>
      <h2 className="text-xl font-semibold text-white">Audit log</h2>
      <div className="mt-5 overflow-x-auto">
        <Table columns={['Actor', 'Action', 'Entity', 'Time', 'Impact']}>
          {auditRecords.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.actor}</TableCell>
              <TableCell>{entry.action}</TableCell>
              <TableCell>{entry.entity}</TableCell>
              <TableCell>{entry.time}</TableCell>
              <TableCell>
                <Badge status={entry.impact}>{entry.impact}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </Card>
  );
}
