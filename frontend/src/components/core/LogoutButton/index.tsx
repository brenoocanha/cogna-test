'use client';

import { Button } from '@/components/ui/button';

const LogoutButton = ({ logoutFn }: { logoutFn: () => void }) => {
  return (
    <Button className="cursor-pointer" onClick={logoutFn}>
      Logout
    </Button>
  );
};

export default LogoutButton;
