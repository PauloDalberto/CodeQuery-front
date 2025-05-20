import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteConversation } from "@/services/ia/rooms"
import { useParams, useRouter } from "next/navigation"

interface AlertDialogComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AlertDialogComponent({ isOpen, onClose }: AlertDialogComponentProps) {
  const params = useParams();
  const routes = useRouter()

  const handleDelete = async () => {
    await deleteConversation(params.conversation as string);
    onClose();
    routes.push('/')
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Essa conversa vai ser permanentemente deletada da sua conta e não será possível recuperá-la!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
