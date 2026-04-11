// "use client";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { Toaster } from "react-hot-toast";

// export default function Providers({ children }: { children: React.ReactNode }) {

// const queryClient = new QueryClient()

//   return (
//     <QueryClientProvider client={queryClient}>
//       <GoogleOAuthProvider clientId="598712780231-hs2ekjg5672jjgm2l76i5s49mcplhfnj.apps.googleusercontent.com">
//         {children}
//         <Toaster position="top-right" />
//         <ReactQueryDevtools />
//       </GoogleOAuthProvider>
//     </QueryClientProvider>
//   );
// }
//jkhas
"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {

  const [queryClient] = useState(() => new QueryClient());
// 598712780231-hs2ekjg5672jjgm2l76i5s49mcplhfnj.apps.googleusercontent.com
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="598712780231-hs2ekjg5672jjgm2l76i5s49mcplhfnj.apps.googleusercontent.com">
        {children}
        <Toaster position="top-right" />
        <ReactQueryDevtools />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}