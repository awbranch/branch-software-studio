import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

interface Props {
  service: 'github' | 'linkedin';
}

export default function ServiceButton({ service }: Props) {
  return (
    <Link
      className="hover:text-gray-200"
      href={
        service === 'github'
          ? 'https://github.com/awbranch'
          : 'https://www.linkedin.com/in/awbranch/'
      }
      target="_blank"
      rel="nofollow"
    >
      {service === 'github' ? <FaGithub /> : <FaLinkedin />}
    </Link>
  );
}
