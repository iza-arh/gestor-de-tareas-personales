export default function MetricCard({ label, totalRecords, subRecords, color }) {

    const calculatePercentage = () => {
        return String(Math.round((subRecords / totalRecords) * 100)) + "%"
    }

    const percentage = calculatePercentage()

    return (
        <div style={{ background: '#5B5E5B', borderRadius: 8, padding: '14px 16px' }}>
            <p style={{ fontSize: 16, color: '#A3A8A3', margin: '0 0 4px' }}>{label}</p>
            <p style={{ fontSize: 26, fontWeight: 500, color: color || 'inherit', margin: 0 }}>{subRecords}</p>
            {percentage && <p style={{ fontSize: 13, color: '#A3A8A3', margin: '2px 0 0' }}>{percentage}</p>}
        </div>
    )
}