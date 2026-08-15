import "./CGPACircle.css";

export function CGPACircle({ cgpa }) {
    cgpa = Number(cgpa);

    const percentage = cgpa * 10;

    return (
        <div
            className="div-cgpa-circle"
            style={{
                background: `conic-gradient(
                    cyan ${percentage * 3.6}deg,
                    rgba(255,255,255,0.12) ${percentage * 3.6}deg
                )`
            }}
        >
            <div className="div-cgpa-inner">
                <div className="div-cgpa-value">
                    {cgpa.toFixed(2)}
                </div>
            </div>
        </div>
    );
}