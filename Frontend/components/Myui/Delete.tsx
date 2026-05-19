import { Shield, Trash2Icon, X } from "lucide-react";
import { Button } from "../ui/button";
interface deleteprops {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  del: () => void;
}

export default function Delete({ close, del }: deleteprops) {
  return (
    <div>
      {/** upper */}
      <div>
        <X onClick={() => close((prev) => !prev)} />
      </div>
      <div>
        <strong>
          <h2>Are You Sure ?</h2>
        </strong>
        <h4>deleting this will be delted permentley.</h4>
      </div>
      {/**footer */}
      <div>
        <Button onClick={() => del}>
          <Trash2Icon />
        </Button>
        <Button onClick={() => close}>
          <Shield />
        </Button>
      </div>
    </div>
  );
}
