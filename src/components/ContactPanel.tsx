import { useState, type CSSProperties, type FormEvent } from "react";

type ContactPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SubmitState = "idle" | "sending" | "sent" | "error";

export default function ContactPanel({ isOpen, onClose }: ContactPanelProps) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("sending");
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Could not send message");
      }

      event.currentTarget.reset();
      setSubmitState("sent");
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : "Could not send message");
      setSubmitState("error");
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="contact-panel absolute z-[80] rounded-[12px] p-[18px]"
      style={{ left: 1012, top: 96, width: 346 } as CSSProperties}
      id="contact"
    >
      <div className="mb-[14px] flex items-start justify-between gap-[16px]">
        <div>
          <h2 className="font-inter text-[20px] font-bold leading-none text-white">Contact</h2>
          <p className="mt-[7px] font-inter text-[12px] text-[#94a3b8]">Send a message to my Discord</p>
        </div>
        <button
          className="contact-close"
          type="button"
          onClick={onClose}
          aria-label="Close contact form"
        />
      </div>

      <form className="flex flex-col gap-[10px]" onSubmit={handleSubmit}>
        <input className="contact-field" name="name" placeholder="Name" maxLength={80} />
        <input className="contact-field" name="email" placeholder="Email" maxLength={120} type="email" />
        <textarea
          className="contact-field min-h-[96px] resize-none"
          name="message"
          placeholder="Message"
          maxLength={1200}
          required
        />
        <button className="contact-submit" type="submit" disabled={submitState === "sending"}>
          {submitState === "sending" ? "Sending..." : "Send Message"}
        </button>
        {submitState === "sent" && (
          <p className="font-inter text-[12px] font-semibold text-[#61dafb]">Message sent to Discord.</p>
        )}
        {submitState === "error" && (
          <p className="font-inter text-[12px] font-semibold text-[#fb7185]">{error}</p>
        )}
      </form>
    </div>
  );
}
