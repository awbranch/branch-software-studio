import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";
import { baseUrl } from "@/utils/globals";

const startYear = 2023;
const year = new Date().getFullYear();

interface ContactConfirmationProps {
  name: string;
  email: string;
}

export const ContactConfirmation = ({
  name,
  email,
}: ContactConfirmationProps) => {
  const previewText = `Hello from Branch Software Studio`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/logo.png`}
                width="60"
                height="60"
                alt="Branch Software Studio"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              <strong>BRANCH</strong> Software Studio
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              {name},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Thank you for contacting{" "}
              <Link
                href={"https://branchstudio.io"}
                className="text-blue-600 no-underline"
              >
                Branch Software Studio
              </Link>
              . Your message has been received, and we will get back to you as
              soon as possible.
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Heading
              as="h3"
              className="mb-2 text-[12px] font-normal text-[#666666]"
            >
              Simple, creative, and effective websites.
            </Heading>
            <Text className="m-0 p-0 text-[10px] leading-snug text-[#666666]">
              © {startYear} - {year} Branch Software Studio LLC. All rights
              reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ContactConfirmation.PreviewProps = {
  name: "Andrew Branch",
  email: "andrew@branchstudio.io",
} as ContactConfirmationProps;

export default ContactConfirmation;
