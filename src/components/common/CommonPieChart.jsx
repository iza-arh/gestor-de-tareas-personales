import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card } from "@heroui/react";

const COLORS = ['#FFD400', '#0055DA', '#00C68D'];

export default function CommonPieChart({ metasData }) {
    const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, fill, value }) => {
        const RADIAN = Math.PI / 180;
        const cos = Math.cos(-RADIAN * midAngle);
        const sin = Math.sin(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#fff">
                    {value}
                </text>
            </g>
        );
    };

    return (
        <Card className="w-3/5 flex justify-center" style={{ background: '#302E2E'}}>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={metasData} dataKey="value" label={renderCustomLabel}>
                        {metasData.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Card>
    );
}