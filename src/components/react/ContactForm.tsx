import { type FormEvent, useRef } from "react";
import Label from "@/components/react/Label";
import TextInput from "@/components/react/TextInput";
import TextArea from "@/components/react/TextArea";
import Button from "@/components/react/Button";
import { toast, Toaster } from "react-hot-toast";
import { formSubject } from "@/utils/globals";

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.set("subject", formSubject);

    const response = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });

    const data: any = await response.json();

    if (response.ok) {
      if (data.message) {
        toast.success(data.message);
      }
      formRef.current?.reset();
    } else {
      if (data.message) {
        toast.error(data.message);
      }
    }
  }

  return (
    <div className="invisible">
      <form ref={formRef} onSubmit={submit}>
        {/* This field is hidden to prevent spam bots */}
        <div className="mb-8 hidden">
          <Label className="mb-2" htmlFor="subject">
            Subject
          </Label>
          <TextInput type="text" id="subject" name="subject" />
        </div>
        <div className="mb-8">
          <Label className="mb-2" htmlFor="name">
            Name
          </Label>
          <TextInput type="text" id="name" name="name" required />
        </div>
        <div className="mb-8">
          <Label className="mb-2" htmlFor="email">
            Email
          </Label>
          <TextInput type="email" id="email" name="email" required />
        </div>
        <div className="mb-12">
          <Label className="mb-2" htmlFor="message">
            Message
          </Label>
          <TextArea id="message" name="message" rows={4} />
        </div>
        <div className="text-right">
          <Button type="submit">Submit</Button>
        </div>
      </form>
      <Toaster position={"bottom-right"} />
    </div>
  );
}
export default ContactForm;
