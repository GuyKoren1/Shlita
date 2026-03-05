// ==================== State ====================
let state = {
    accessLevel: null, // 'admin' or 'viewer'
    personnel: [],
    customColumns: [],
    activities: [],
    columnConfig: null, // dynamic column config (null = use default)
    sortColumn: null,
    sortDirection: 'asc',
    editingCell: null,
    editingPersonIndex: null, // for edit mode in modal
    currentActivityId: null,
    cameras: [],
    faultRecords: [],
    shootingRecords: [],
    report1: { startDate: null, entries: {}, excluded: [] },
    snapshots: [],
    viewingSnapshotId: null // UI-only, not persisted
};
