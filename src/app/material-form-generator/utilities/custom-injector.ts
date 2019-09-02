import { ReflectiveInjector, Injector } from '@angular/core';
import { AdvancedSettingsAction, AdvancedSettingsActionName } from '../model/advanced-settings.model';

export const getCustomInjector = (actions: AdvancedSettingsAction) => (
    ReflectiveInjector.resolveAndCreate([{
             provide: AdvancedSettingsActionName.actionName, useValue: actions
}]) as Injector);