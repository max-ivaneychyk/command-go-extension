import React, {useContext} from "react";
import {CgDanger, CgInfo, CgClose} from "react-icons/cg";
import {NotificationsCtx} from "../ctx/notifications";

export const errStyles = {
  backgroundColor: '#f8d7da',
  color: '#721c24',
  border: '1px solid #f5c6cb',
  Icon: CgDanger
}

export const infoStyles = {
  backgroundColor: '#cfe2ff',
  color: '#084298',
  border: `1px solid #b6d4fe`,
  Icon: CgInfo
};

export const warningStyles = {
  backgroundColor: '#fff3cd',  // Light yellow background for visibility
  color: '#856404',            // Darker yellow/brown text for readability
  border: '1px solid #ffeeba', // Soft yellow border for a subtle emphasis
  Icon: CgDanger,                // Info icon for context
};

const NotificationMessage = ({children, className, pallet = errStyles, allowClear = false, id}) => {
  const {actions} = useContext(NotificationsCtx)
  const {Icon} = pallet;

  return (
    <div
      role="alert"
      className={`flex flex-nowrap items-center p-2.5 my-2.5 mx-2 rounded-2xl ${className}`}
      style={pallet}>
      <Icon className={'inline text-[20px] mr-2 min-w-[26px]'}/>
      {children}
      {allowClear && <CgClose onClick={() => actions.remove(id)} className={'inline text-[20px] ml-auto mr-1 min-w-[26px] cursor-pointer'}/>}
    </div>
  )
}

export default NotificationMessage;
