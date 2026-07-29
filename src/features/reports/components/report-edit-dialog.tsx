import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdateReport } from "@/features/reports/hooks/use-reports";
import { useCategories } from "@/features/categories/hooks/use-categories";
import {
  reportSchema,
  type ReportFormValues,
} from "@/features/reports/schemas/report-schema";
import type { ReportSummaryResponse } from "@/features/reports/types/reports-types";
import { useReport } from "@/features/reports/hooks/use-reports";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/ui/dialog";

interface ReportEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: ReportSummaryResponse | null;
}

export function ReportEditDialog({
  open,
  onOpenChange,
  report,
}: ReportEditDialogProps) {
  const updateMutation = useUpdateReport();
  const { data: reportDetail, isLoading: isLoadingDetail } = useReport(
    open ? report?.id : undefined,
  );
  const { data: categoriesData } = useCategories({
    page: 0,
    size: 100,
    isActive: true,
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ReportFormValues>({ resolver: zodResolver(reportSchema) });

  useEffect(() => {
    if (reportDetail) {
      reset({
        title: reportDetail.title,
        description: reportDetail.description ?? "",
        categoryId: reportDetail.category.id,
        street: reportDetail.address.street,
        number: reportDetail.address.number ?? "",
        city: reportDetail.address.city,
        reference: reportDetail.address.reference ?? "",
      });
    }
  }, [reportDetail, reset]);

  function onSubmit(values: ReportFormValues) {
    if (!report) return;
    updateMutation.mutate(
      {
        id: report.id,
        request: {
          title: values.title,
          description: values.description,
          categoryId: values.categoryId,
          address: {
            street: values.street,
            number: values.number,
            city: values.city,
            reference: values.reference,
          },
        },
      },
      { onSuccess: () => onOpenChange(false) },
    );
  }

  const canEdit = report?.status === "PENDING";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar report</DialogTitle>
          <DialogDescription>
            {canEdit
              ? "Actualiza os dados do report."
              : "Este report já não está pendente — não pode ser editado."}
          </DialogDescription>
        </DialogHeader>

        {isLoadingDetail && (
          <p className="text-sm text-muted-foreground">A carregar...</p>
        )}

        {!isLoadingDetail && reportDetail && (
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Título</label>
              <Input disabled={!canEdit} {...register("title")} />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Descrição</label>
              <Textarea disabled={!canEdit} {...register("description")} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Categoria</label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    disabled={!canEdit}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriesData?.content.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.categoryId && (
                <p className="text-sm text-destructive">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Rua</label>
                <Input disabled={!canEdit} {...register("street")} />
                {errors.street && (
                  <p className="text-sm text-destructive">
                    {errors.street.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Número</label>
                <Input disabled={!canEdit} {...register("number")} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Cidade</label>
              <Input disabled={!canEdit} {...register("city")} />
              {errors.city && (
                <p className="text-sm text-destructive">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Referência</label>
              <Textarea disabled={!canEdit} {...register("reference")} />
            </div>

            {canEdit && (
              <DialogFooter>
                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? "A guardar..." : "Guardar"}
                </Button>
              </DialogFooter>
            )}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
