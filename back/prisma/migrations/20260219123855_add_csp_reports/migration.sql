-- CreateTable
CREATE TABLE "csp_reports" (
    "id" SERIAL NOT NULL,
    "document_uri" TEXT NOT NULL,
    "violated_directive" TEXT NOT NULL,
    "blocked_uri" TEXT NOT NULL,
    "raw_report" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "csp_reports_pkey" PRIMARY KEY ("id")
);
