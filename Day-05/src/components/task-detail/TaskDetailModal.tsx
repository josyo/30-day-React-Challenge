import "../../index.css";
import type { TaskDetailsProps } from "../../types/task";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function TaskDetailModal({ value, onChange }: TaskDetailsProps) {
  return (
    <Dialog
      open={value !== null}
      onOpenChange={(open) => {
        if (!open) onChange(null);
      }}
    >
      <DialogContent className="details-panel">
        {value && (
          <>
            <DialogHeader>
              <DialogTitle>{value.title}</DialogTitle>
            </DialogHeader>

            <hr className="panel-divider" />

            {/* Identity */}
            <div className="detail-section-label">Identity</div>

            <div className="detail-group">
              <div className="detail-label">Summary</div>
              <div className="detail-value">{value.summary}</div>
            </div>

            <div className="detail-group">
              <div className="detail-label">Task ID</div>
              <div className="detail-value detail-mono">
                tsk_{value.id}_2026
              </div>
            </div>

            <hr className="panel-divider" />

            {/* Contact */}
            <div className="detail-section-label">Contact</div>

            <div className="detail-group">
              <div className="detail-label">Reporter Email</div>
              <div className="detail-value">{value.reporterEmail}</div>
            </div>

            <div className="detail-group">
              <div className="detail-label">Contact Phone</div>
              <div className="detail-value">{value.contactPhone}</div>
            </div>

            <div className="detail-group">
              <div className="detail-label">Reference URL</div>
              <div className="detail-value">
                
                <a  href={
                    value.referenceUrl.startsWith("http")
                      ? value.referenceUrl
                      : `https://${value.referenceUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="detail-link"
                >
                  {value.referenceUrl}
                </a>
              </div>
            </div>

            <hr className="panel-divider" />

            {/* Location */}
            <div className="detail-section-label">Location</div>

            <div className="detail-group">
              <div className="detail-label">Room / Floor</div>
              <div className="detail-value">
                {value.location.room}, {value.location.floor}
              </div>
            </div>

            <div className="detail-group">
              <div className="detail-label">Building / Zone</div>
              <div className="detail-value">
                {value.location.building}, {value.location.zoneCode}
              </div>
            </div>

            <div className="detail-group">
              <div className="detail-label">Coordinates</div>
              <div className="detail-value detail-mono">
                {value.location.coordinates.lat},{" "}
                {value.location.coordinates.lng}
              </div>
            </div>

            <hr className="panel-divider" />

            {/* Category */}
            <div className="detail-section-label">Category</div>

            <div className="detail-group">
              <div className="detail-label">Category Name</div>
              <div className="detail-value" style={{ fontWeight: 500 }}>
                {value.category.name}
              </div>
            </div>

            <div className="detail-group">
              <div className="detail-label">Focus Area</div>
              <div className="detail-value detail-italic">
                "{value.category.focusArea}"
              </div>
            </div>

            <div className="detail-group">
              <div className="detail-label">Billing Code</div>
              <div className="detail-value">{value.category.billingCode}</div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}