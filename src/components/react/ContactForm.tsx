import { type FormEvent, useState } from "react";
import Label from "@/components/react/Label";
import TextInput from "@/components/react/TextInput";
import TextArea from "@/components/react/TextArea";
import Button from "@/components/react/Button";

function ContactForm() {
  const [responseMessage, setResponseMessage] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    console.log("in On Submit");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log("FormData", formData);

    const response = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });

    const data: any = await response.json();
    console.log("Data", data);
    if (data.message) {
      setResponseMessage(data.message);
    }
  }

  return (
    <form onSubmit={submit}>
      <div className="mb-8">
        <Label className="mb-2" htmlFor="first_name">
          Name
        </Label>
        <TextInput type="text" id="name" required />
      </div>
      <div className="mb-8">
        <Label className="mb-2" htmlFor="email">
          Email
        </Label>
        <TextInput type="email" id="email" required />
      </div>
      <div className="mb-12">
        <Label className="mb-2" htmlFor="message">
          Message
        </Label>
        <TextArea id="message" rows={4} />
      </div>
      <div className="text-right">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
export default ContactForm;
