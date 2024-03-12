import React, { useEffect, useState } from "react";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [files, setFiles] = useState([]);

  const selectedRoom = React.useMemo(
    () => rooms.find((room) => room.Room_Id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  );

  const filesNotUpdate = React.useMemo(
    () => files.filter((e) => e.Status === "P") || [],
    [files]
  );

  useEffect(() => {
    let _files = files;
    if (filesNotUpdate.length > 0) {
      for (var i = 0; i < _files.length; i++) {
        if (_files[i] == "P") {
          //xử lý tải file ở đây
          //thành công
          _files[i] = "D";

          // //lỗi
          // _files[i] = 'E';
          setFiles(_files);
        }
      }
    }
  }, [files]);

  const clearState = () => {
    setFiles([]);
  };

  return (
    <AppContext.Provider
      value={{
        rooms,
        setRooms,
        countHasNotSeen,
        selectedRoom,
        selectedRoomId,
        setSelectedRoomId,
        clearState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
