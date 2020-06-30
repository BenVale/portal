export const state = () => ({
  items: []
})

export const mutations = {
  updateItems(state, data){
    state.items = [...data];
  }
}

export const actions = {
  load: async ({commit}, data) => {
    // TODO: api call to get licenses
    // TODO: var items = await axios.get(data.url);    
    // TODO: remove this demo code
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    var items = [
      {
        id: '00',
        name: 'Typefi Workgroup Subscription License',
        expireDate: new Date('Feb 16, 2021'),
        claimDate: new Date('Jan 28, 2020'),
        maintenanceDate: new Date('Feb 16, 2021'),
        issuedBy: 'kjankowski@typefi.com',
        issuedTo: 'OmniCorp',
        installation: 'Typefi Workgroup on SRVINDS01NYC1 (Reissue)',
        installationCode: 'TYPE-9222-2222-5356-5975',
        macAddress: '00-50-56-92-14-A6',
        engineLimit: 1,
        licenseVersion: 1,
        plugins: 34
      },
      {
        id: '01',
        name: 'Blinkenlights License',
        expireDate: new Date('Mar 30, 2022'),
        claimDate: new Date('Mar 30, 2021'),
        maintenanceDate: new Date('Oct 30, 2021'),
        issuedBy: 'kjankowski@typefi.com',
        issuedTo: 'OmniCorp',
        installation: 'Blinkenlights on SRVINDS01NYC1 (Reissue)',
        installationCode: 'TYPE-1111-9241-5356-5975',
        macAddress: '00-50-56-92-14-A7',
        engineLimit: 1,
        licenseVersion: 1,
        plugins: 34
      },
      {
        id: '02',
        name: 'Fake plugin License',
        expireDate: new Date('Mar 30, 2022'),
        claimDate: new Date('Mar 30, 2021'),
        maintenanceDate: new Date('Oct 30, 2021'),
        issuedBy: 'kjankowski@typefi.com',
        issuedTo: 'OmniCorp',
        installation: 'Blinkenlights on SRVINDS01NYC1 (Reissue)',
        installationCode: 'TYPE-3333-9241-5356-5975',
        macAddress: '00-50-56-92-14-A7',
        engineLimit: 1,
        licenseVersion: 1,
        plugins: 34
      },
      {
        id: '03',
        name: 'Typefi Writer License',
        expireDate: new Date('Mar 30, 2022'),
        claimDate: new Date('Mar 30, 2021'),
        maintenanceDate: new Date('Oct 30, 2021'),
        issuedBy: 'kjankowski@typefi.com',
        issuedTo: 'OmniCorp',
        installation: 'Blinkenlights on SRVINDS01NYC1 (Reissue)',
        installationCode: 'TYPE-4444-9241-5356-5975',
        macAddress: '00-50-56-92-14-A7',
        engineLimit: 1,
        licenseVersion: 1,
        plugins: 34
      }
    ];
    commit('updateItems', items);
  }
}