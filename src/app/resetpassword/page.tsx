import { Suspense } from "react";
import ResetPasswordForm from "./resetpasswordform";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
