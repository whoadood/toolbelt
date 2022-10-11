import React from "react";

export default function SettingsHeading({ title }: { title: string }) {
  return (
    <h2 className="border-b border-gray-400/50 text-gray-200/50 transition-colors duration-150 ease-in-out hover:text-white">
      {title}
    </h2>
  );
}
