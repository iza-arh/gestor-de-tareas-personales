import { Card } from "@heroui/react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function CommonBarChart({ metasData }) {

    return (
        <Card className="w-full" style={{ background: '#302E2E' }}>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={metasData}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
                    <YAxis />
                    <Bar dataKey="value" fill="#7F77DD" />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}