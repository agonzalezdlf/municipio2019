package mx.gob.municipio.centro.view.controller.configuracion;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import mx.gob.municipio.centro.model.gateways.sam.catalogos.GatewayGrupos;
import mx.gob.municipio.centro.model.gateways.sam.catalogos.GruposTipoFacGateway;
import mx.gob.municipio.centro.view.bases.ControladorBase;

@Controller
@RequestMapping("/sam/configuracion/configuracion_grupos_tipo_fac.action")
public class ControladorGruposTipoFac extends ControladorBase {

	private static Logger log = 
	        Logger.getLogger(ControladorGruposTipoFac.class.getName());
	
	@Autowired
	GruposTipoFacGateway gruposTipoFacGateway;	
	
	@Autowired
	GatewayGrupos gatewayGrupos;
	
	public ControladorGruposTipoFac(){		
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(method = RequestMethod.GET)    
	public String  requestGetControlador( Map modelo ) {				
		modelo.put("grupos", gatewayGrupos.getGruposEstatus("ACTIVO","TIPO FAC"));
	    return "sam/configuracion/configuracion_grupos_tipo_fac.jsp";
	}
	
	public void  guardarTipoFacGrupo( final List<Integer> tiposOp,final Integer grupo ) {
		  try {                 
	            this.getTransactionTemplate().execute(new TransactionCallbackWithoutResult(){
	                @Override
	    protected void   doInTransactionWithoutResult(TransactionStatus status) {	                	
	                	gruposTipoFacGateway.eliminar(grupo);
	                	for (Integer  tipoOp :tiposOp)
	                		gruposTipoFacGateway.inserta(tipoOp, grupo);	                			                	
	                } });
	                } catch (DataAccessException e) {            
	                    log.info("Los registros tienen relaciones con otras tablas ");	                    
	                    throw new RuntimeException(e.getMessage(),e);
	                }	                	                		  	  
	  }
	  
	
   public List getGrupoTipoFac(Integer  grupo) {
    	  return gruposTipoFacGateway.getGrupoTipoFac(grupo);
 	  }    
}
