"use client";

import { Store } from "@prisma/client";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  useTransition,
} from "react";
import { handleGetStores } from "~/server/actions/stores";
import {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import { Move, StoreIcon } from "lucide-react";

const StoreContext = createContext<{
  store: Store | null;
  switchStore: Function;
}>({ store: null, switchStore: () => {} });

export function StoreProvider({
  children,
  storeInput,
}: {
  children: React.ReactNode;
  storeInput: Store;
}) {
  const switchStore = (newStore: Store) => {
    setCurrentStore({ store: newStore, switchStore });
  };

  const [currentStore, setCurrentStore] = useState<{
    store: Store | null;
    switchStore: (newStore: Store) => void;
  }>({ store: storeInput, switchStore });

  return (
    <StoreContext.Provider value={currentStore}>
      {children}
    </StoreContext.Provider>
  );
}

export function StoreDispatchInADialog() {
  const [stores, setStores] = useState<Store[]>([]);
  const storeContext = useStore();
  const [changeStore, startStoreSave] = useTransition();

  useEffect(() => {
    const fetchData = async () => {
      const stores = await handleGetStores();
      setStores(stores);
    };

    fetchData().catch(console.error);
  }, []);

  function updateStore(storeId: string) {
    startStoreSave(() => {
      const store = stores.find((store) => store.id.toString() === storeId);
      if (!store) return;
      storeContext.switchStore(store);
    });
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Change your active store</DialogTitle>
        <DialogDescription>
          Change your active store to change where you are allocating stock to
        </DialogDescription>
      </DialogHeader>
      <Select onValueChange={updateStore}>
        <SelectTrigger>
          <SelectValue
            placeholder={
              storeContext.store?.name
                ? storeContext.store?.name
                : "Select store"
            }
          />
        </SelectTrigger>
        <SelectContent>
          {stores.map((store) => (
            <SelectItem key={store.id} value={store.id.toString()}>
              {store.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-sm text-gray-500">
        Store not listed? Please get in touch with the office.
      </p>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="secondary">Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}

export function DivToChangeStore() {
  const currentStore = useStore();

  return (
    <div className="my-2 rounded-xl bg-gradient-to-tr from-blue-500 via-sky-400  to-cyan-400 p-5 text-white">
      <div>
        <StoreIcon className="h-7 w-7" />
        <h4>
          {currentStore.store
            ? `Your active store is currently ${currentStore.store.name}`
            : `Please select a store to get started`}
        </h4>
      </div>
      <p className="mb-2 text-sm text-gray-100">
        You can change your active store at any time from the navigation menu.
      </p>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"secondary"}>
            <Move className="mr-1 h-5 w-5" />
            Change Store
          </Button>
        </DialogTrigger>
        <StoreDispatchInADialog />
      </Dialog>
    </div>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
