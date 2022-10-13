import React from "react";
import { Note } from "../types/global";

export default function Note({ note }: { note: Note }) {
  return <div>{note.text}</div>;
}
