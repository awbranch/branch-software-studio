import { type FormEvent, useState } from "react";
import Label from "@/components/react/Label";
import TextInput from "@/components/react/TextInput";
import TextArea from "@/components/react/TextArea";
import Button from "@/components/react/Button";
import { toast, Toaster } from "react-hot-toast";

function ContactForm() {
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const response = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });

    const data: any = await response.json();
    if (data.message) {
      toast.success(data.message);
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
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
          <Button>Submit</Button>
        </div>
      </form>
      <Toaster position={"bottom-right"} />
    </div>
  );
}
export default ContactForm;
