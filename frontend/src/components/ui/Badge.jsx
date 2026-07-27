const variants = {
    pending: "badge-pending",
    applied: "badge-applied",
    accepted: "badge-accepted",
    rejected: "badge-rejected",
};

export default function Badge({ status, label }) {
    return (
        <span className={variants[status] || "badge-pending"}>
            {label || status} 
        </span>
    );
}