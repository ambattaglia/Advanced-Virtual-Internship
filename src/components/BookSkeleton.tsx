import React from "react";

export function CardSkeleton() {
  return (
    <div className="recommended__books--skeleton skeleton" style={{ height: "240px", borderRadius: "4px" }}></div>
  );
}

export function SelectedBookSkeleton() {
  return (
    <div className="selected__book--skeleton skeleton" style={{ borderRadius: "4px" }}></div>
  );
}
