import { useEffect, useState } from "react";
import "./ErrorMessage.css";

/**
 * ErrorMessage — a themed error toast.
 * Renders a red-bordered box (matching the app's dark theme) with red text,
 * fixed to the bottom of the screen, that slides in when `message` is set
 * and automatically slides out again after `duration` ms.
 *
 * @param {string} message   - the error text to show. Falsy = render nothing.
 * @param {number} duration  - how long the message stays visible, in ms (default 4000)
 * @param {function} onDismiss - optional callback fired once the toast has
 *        finished auto-hiding, so the caller can reset its own error state
 *        (e.g. setError('')) and be ready to show a fresh error later.
 */
export function ErrorMessage({ message, duration = 4000, onDismiss }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!message) return;

        setVisible(true);

        const hideTimer = setTimeout(() => {
            setVisible(false);

            if (onDismiss) {
                setTimeout(onDismiss, 400);
            }
        }, duration);

        return () => clearTimeout(hideTimer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);

    if (!message) return null;

    return (
        <div
            className={`div-error-toast ${visible ? "div-error-toast-show" : ""}`}
            role="alert"
        >
            <div className="div-error-toast-box">
                <span className="error-toast-text">{message}</span>
            </div>
        </div>
    );
}

export default ErrorMessage;
