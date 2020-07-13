const getEdittedState = (state: any[], id: number, value: string | number | undefined, key: string ) => {
    const index = state.findIndex((item) => item.id === id);
    const copiedState = [...state];
    copiedState[index] = { ...copiedState[index], [key]:value };
    return copiedState
}

export default getEdittedState