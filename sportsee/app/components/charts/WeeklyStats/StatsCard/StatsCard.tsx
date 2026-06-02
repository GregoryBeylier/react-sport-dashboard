
export type StatsCardProps = {
 label: string;
 value: number;
 unit: string;
};

export default function StatsCard({ label, value, unit }: StatsCardProps) {
    return (
        <div>{label} : {value} {unit}</div>

    )
}