import { ButtonWithTooltip } from "@/components/button-with-tooltip";
import { ClipboardCopy, SquareArrowUpRight } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "sonner";

export const DataTableUrlCell = ({ url }: { url: string }) => {
  if (url.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-center">
      <CopyToClipboard text={url}>
        <ButtonWithTooltip
          label="Coppy to clipboard"
          size="icon"
          variant={"ghost"}
          onClick={() => {
            const shortenUrl = url.length > 50 ? url.slice(0, 50) + "..." : url;
            toast.success(`${shortenUrl} is copied to clipboard`);
          }}
        >
          <ClipboardCopy />
        </ButtonWithTooltip>
      </CopyToClipboard>

      <ButtonWithTooltip label="Open in new tab" size="icon" variant={"ghost"}>
        <a href={url} rel="noopener noreferrer" target="_blank">
          <SquareArrowUpRight />
        </a>
      </ButtonWithTooltip>
    </div>
  );
};
