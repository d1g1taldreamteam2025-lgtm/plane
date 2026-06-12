/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

import { Download, X } from "lucide-react";
import Link from "next/link";
// ui
import { Button } from "@plane/propel/button";
import { EModalPosition, EModalWidth, ModalCore } from "@plane/ui";
import type { TAttachmentPreviewType } from "@plane/utils";

type TIssueAttachmentPreviewModal = {
  isOpen: boolean;
  onClose: () => void;
  fileURL: string;
  fileName: string;
  previewType: TAttachmentPreviewType;
};

export function IssueAttachmentPreviewModal(props: TIssueAttachmentPreviewModal) {
  const { isOpen, onClose, fileURL, fileName, previewType } = props;

  return (
    <ModalCore
      isOpen={isOpen}
      handleClose={onClose}
      position={EModalPosition.CENTER}
      width={EModalWidth.VIXL}
      className="overflow-hidden"
    >
      <div className="flex items-center justify-between gap-3 border-b border-subtle px-4 py-3">
        <span className="truncate text-sm font-medium text-primary" title={fileName}>
          {fileName}
        </span>
        <div className="flex flex-shrink-0 items-center gap-2">
          <Link href={fileURL} target="_blank" rel="noopener noreferrer" download>
            <Button variant="secondary" size="base" prependIcon={<Download className="h-3.5 w-3.5" />}>
              Descargar
            </Button>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="grid place-items-center rounded p-1 text-secondary hover:bg-surface-2 hover:text-primary"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex max-h-[80vh] items-center justify-center bg-surface-2 p-2">
        {previewType === "image" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={fileURL} alt={fileName} className="max-h-[78vh] max-w-full object-contain" />
        )}
        {previewType === "video" && (
          <video src={fileURL} controls autoPlay className="max-h-[78vh] max-w-full">
            <track kind="captions" />
          </video>
        )}
        {previewType === "audio" && (
          <div className="w-full px-4 py-10">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio src={fileURL} controls autoPlay className="w-full" />
          </div>
        )}
        {previewType === "pdf" && (
          <iframe src={fileURL} title={fileName} className="h-[78vh] w-full bg-white" />
        )}
      </div>
    </ModalCore>
  );
}
